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
  Typography
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
const {Text} = Typography;
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
  const api_url = import.meta.env.VITE_BASE_URL;


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
    const result = await requestHandler(api.get("form/get/donate"), {
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
            task.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.organization_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const onChange = async(id, e) => {
    // let checked = e.target.checked;
    // updateStatus(id, Number(checked));
    const response = await fetch(api_url+'/form/update/status/donate',{
      method:"POST",
      headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({row_id:id})
     });

    if(response.status==200){
      console.log('success')
      getData();
    }
  };

  const onDelete = async(id)=>{
    const response = await fetch(api_url+'/form/delete/donate',{
      method:"POST",
      headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({row_id:id})
     });

    if(response.status==200){
      console.log('success')
      getData();
    }
  }
  useEffect(() => {
    getData();
  }, [reload]);


  const OrganizationInfo = ({data})=>{
    console.log(data);
    if(data.organization_name != '' && data.organization_name != undefined){
      return(
        <>
            <Text style={{fontWeight:'700'}} >{data.organization_name}</Text><br/>
            <Text >ที่อยู่ : {data.organization_address}</Text><br/>
            <Text>{data.organization_phone}</Text>
        </>
      )
    }else{
      return <></>;
    }

  }
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
            {
              console.log(filteredTasks)
            }
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
              {/* <Column title="Title" dataIndex="title" key="title" /> */}
              <Column
                title="ข้อมูลบริษัท"
                dataIndex="organization_name"
                key="organization_name"
                render={(value, record) => <OrganizationInfo data={record}/>}
              />
              <Column
                title="ชื่อ-สกุล (ผู้ประสานงาน)"
                dataIndex="contact_name"
                key="contact_name"
                render={(value, record) => (
                  <div dangerouslySetInnerHTML={{ __html: record.contact_name }} />
                )}
              />
              <Column
                title="หมายเลขโทรศัพท์ "
                dataIndex="contact_phone"
                key="contact_phone"
                render={(value, record) => (
                  <div dangerouslySetInnerHTML={{ __html: record.contact_phone }} />
                )}
              />
              <Column
                title="ยอดบริจาค(บาท)"
                dataIndex="donate_total"
                key="donate_total"
                render={(value, record) => {
                  // <Input value={value} />
                  // <div dangerouslySetInnerHTML={{ __html: record.donate_total }} />
                  const formattedValue = Number(value).toLocaleString('en-US'); // Formats with commas
                  return <div>{formattedValue}</div>;
                }}
              />
              <Column
                title="วันที่ลงทะเบียน"
                dataIndex="record_time"
                key="record_time"
                render={(value) => (
                  <> {dayjs(value).format("YYYY-MM-DD HH:mm:ss")} </>
                )}
              />
              {/* <Column
                title="End Date"
                dataIndex="enddate"
                key="enddate"
                render={(value) => (
                  <> {dayjs(value).format("YYYY-MM-DD HH:mm:ss")} </>
                )}
              /> */}

              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    {/* <a onClick={() => handlerUpdate(record)}>Edit</a>
                    <a onClick={() => handlerDelete(record)}>Delete</a> */}
                    <a style={{color:'red'}} onClick={() => onDelete(record.row_id)}>Delete</a>
                  </Space>
                )}
              />

              <Column
                title="Complete"
                dataIndex="payment_status"
                key="payment_status"
                render={(value, record) => (
                  <Checkbox
                    defaultChecked={value == 1}
                    checked={record.payment_status}
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
