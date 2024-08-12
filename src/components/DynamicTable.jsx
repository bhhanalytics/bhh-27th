import { useState, useEffect, createContext, useContext, useMemo } from "react";
import {
  Space,
  Table,
  Tag,
  Checkbox,
  Radio,
  Form,
  Input,
  Modal,
  Button,
  DatePicker,
  Switch,
  Divider,
} from "antd";

import dayjs from "dayjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { HolderOutlined, SearchOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const RowContext = createContext({});
const { RangePicker } = DatePicker;
const { Column } = Table;
const { TextArea } = Input;

const api = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 15000,
});

import { exportToCSV, exportToExcel, exportToPDF } from "../lib/export";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.title,
  }),
};

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{
        cursor: "move",
      }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Row = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      listeners,
    }),
    [setActivatorNodeRef, listeners]
  );
  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const notifySuccess = (text) => toast.success(text);
const notifyError = (text) => toast.error(text);

const requestHandler = async (
  request,
  {
    afterRequestSuccess = () => {},
    afterRequestError = () => {},
    showNotifySuccess = true,
    showNotifyError = true,
    log = true,
    successText = () => "Success",
    errorText = null,
  } = {}
) => {
  try {
    const res = (await request).data;
    afterRequestSuccess(res);
    log && console.log(res);
    showNotifySuccess && notifySuccess(successText(res));
    return res;
  } catch (error) {
    const errorMessage = errorText || `Error: ${error.message || error}`;
    afterRequestError(error);
    showNotifyError && notifyError(errorMessage);
    log && console.error(error);
    return 0;
  }
};

export default function DynamicTable({ reload }) {
  const [dataSource, setDataSource] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [formState, setFormState] = useState("create");
  const [searchQuery, setSearchQuery] = useState("");

  const [form] = Form.useForm();
  const notify = (text) => toast.success(text);

  const handleOk = () => {
    form.submit();
    form
      .validateFields()
      .then(async (values) => {
        if (formState === "create") {
          createTask(values);
        }
        if (formState === "edit") {
          updateData(values);
        }
      })
      .catch((errorInfo) => {
        console.log("err: ", errorInfo);
      });
  };

  async function getData() {
    const result = await requestHandler(api.get("api/tasks"), {
      showNotifySuccess: false,
      successText: () => "Fetched",
    });
    setDataSource(result.data);
  }

  async function updateData(values) {
    values["startDate"] = values?.dueDate[0];
    values["endDate"] = values?.dueDate[1];

    delete values.dueDate;
    await requestHandler(
      api.put(`/api/tasks/detail/${selectedTasks.row_id}`, values),
      { successText: () => "Updated" }
    );
    setIsModalOpen(false);
    getData();
  }

  async function updateStatus(id, status) {
    await requestHandler(api.put(`/api/tasks/status/${id}`, { status }), {
      showNotifySuccess: false,
    });
    setIsModalOpen(false);
    status === 1 ? notify("Checked") : notify("Unchecked");
  }

  async function deleteData(id) {
    await requestHandler(api.delete(`/api/tasks/${id}`), {
      successText: () => `Deleted Tasks Successful`,
    });
    setOpenConfirmModal(false);
    getData();
  }

  /* --------------------------------- */
  async function handlerDelete(taskData) {
    setOpenConfirmModal(true);
    setSelectedTasks(taskData);
  }

  async function handlerUpdate(taskData) {
    setFormState("edit");
    setIsModalOpen(true);
    setSelectedTasks(taskData);
  }

  async function confirmDelete() {
    if (selectedTasks.row_id) {
      deleteData(selectedTasks.row_id);
    }
  }

  useEffect(() => {
    if (selectedTasks) {
      form.setFieldsValue({
        title: formState === "edit" ? selectedTasks.title : "",
        detail: formState === "edit" ? selectedTasks.detail : "",
        dueDate:
          selectedTasks.startdate &&
          selectedTasks.enddate &&
          formState === "edit"
            ? [dayjs(selectedTasks.startdate), dayjs(selectedTasks.enddate)]
            : [],
      });
    }
  }, [selectedTasks, formState]);

  useEffect(() => {
    getData();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenConfirmModal(false);
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.row_id === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.row_id === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  const filteredTasks =
    dataSource?.length > 0
      ? dataSource.filter(
          (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.detail.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const onChange = (id, e) => {
    let checked = e.target.checked;
    updateStatus(id, Number(checked));
  };
  useEffect(() => {
    getData();
  }, [reload]);

  return (
    <>
      <Toaster />
      <div className="col-span-12">
        <Input
          className="mb-2"
          prefix={<SearchOutlined />}
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex items-center justify-between flex-wrap">
          <Button disabled={rowSelection}> Complete all select </Button>
          <div className="flex gap-2 flex-wrap my-2">
            <Button onClick={() => exportToCSV(dataSource, "myData.csv")}>
              Export as CSV
            </Button>
            <Button onClick={() => exportToExcel(dataSource, "myData.xlsx")}>
              Export as Excel
            </Button>
            <Button onClick={() => exportToPDF(dataSource, "myData.pdf")}>
              Export as PDF
            </Button>
          </div>
        </div>

        <Divider/>

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={filteredTasks.map((i) => i.row_id)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              rowKey="row_id"
              size="middle"
              scroll={{ x: "max-content" }}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              components={{
                body: {
                  row: Row,
                },
              }}
              dataSource={filteredTasks}
            >
              <Column
                align="center"
                key="sort"
                width="80"
                render={() => <DragHandle />}
              />
              <Column title="Title" dataIndex="title" key="title" />
              <Column
                title="Detail"
                dataIndex="detail"
                key="lastName"
                render={(value, record) => (
                  <div dangerouslySetInnerHTML={{ __html: record.detail }} />
                )}
              />
              <Column
                title="Start Date"
                dataIndex="startdate"
                key="startdate"
                render={(value) => (
                  <> {dayjs(value).format("YYYY-MM-DD HH:mm:ss")} </>
                )}
              />
              <Column
                title="End Date"
                dataIndex="enddate"
                key="enddate"
                render={(value) => (
                  <> {dayjs(value).format("YYYY-MM-DD HH:mm:ss")} </>
                )}
              />

              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    <a onClick={() => handlerUpdate(record)}>Edit</a>
                    <a onClick={() => handlerDelete(record)}>Delete</a>
                  </Space>
                )}
              />

              <Column
                title="Complete"
                dataIndex="status"
                key="status"
                render={(value, record) => (
                  <Checkbox
                    defaultChecked={value == 1}
                    onClick={(checked) => onChange(record.row_id, checked)}
                  >
                    Complete
                  </Checkbox>
                )}
              />
            </Table>
          </SortableContext>
        </DndContext>
      </div>

      <Modal
        open={openConfirmModal}
        title="Delete task"
        onOk={confirmDelete}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="warning"
            className="bg-red-400 text-white"
            loading={loading}
            onClick={confirmDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <span> Do you want to delete this task ?</span>
        <span className="underline underline-offset-4 text-red-400 p-2 ml-2 rounded-md">
          {selectedTasks?.title}
        </span>
      </Modal>

      <Modal
        className="top-10"
        title={<div className="capitalize">{formState} Task </div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="warning"
            className="bg-blue-700 text-white"
            onClick={handleOk}
          >
            {formState.toUpperCase()}
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off" 
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Aa" />
          </Form.Item>
          <Form.Item name="detail" label="Detail">
          <TextArea
              placeholder="Aa"
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <RangePicker showTime needConfirm={false} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
