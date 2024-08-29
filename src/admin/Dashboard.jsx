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

import icon from "../assets/img/tasks.svg";
import dayjs from "dayjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import DynamicTable from "../components/DynamicTable";
import { useNavigate } from "react-router-dom";

const RowContext = createContext({});
const { RangePicker } = DatePicker;
const { Column } = Table;
const { TextArea } = Input;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

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

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState("create");
  const [triggerReload, setTriggerReload] = useState(false);
  const [form] = Form.useForm();
  const [loadingRequest, setLoadingRequest] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('userdata') != 'admin'){
      navigate('/login');
    }
  },[])
  const forceReload = () => {
    setTriggerReload((prev) => !prev); // Toggle the state to trigger re-render
  };

  const showModal = () => {
    setFormState("create");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    form
      .validateFields()
      .then(async (values) => {
        if (formState === "create") {
          createTask(values);
        }
        if (formState === "edit") {
          updateTask(values);
        }
      })
      .catch((errorInfo) => {
        console.log("err: ", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenConfirmModal(false);
  };

  async function createTask(values) {
    values["startDate"] = values?.dueDate[0];
    values["endDate"] = values?.dueDate[1];
    delete values.dueDate;
    setLoadingRequest(true);
    const result = await requestHandler(api.post("api/task", values));
    setLoadingRequest(false);
    setIsModalOpen(false);
    form.resetFields();
    forceReload();
  }

  return (
    <>
      {/* <Toaster /> */}
      <Modal
        className="top-10"
        centered
        title={<div className="capitalize">{formState} Task </div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loadingRequest}
        okText={formState.toUpperCase()}
        cancelButtonProps={{
          hidden: true,
        }}
        zIndex={9999}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          requiredMark={false} 
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

      <main className=" bg-white text-black w-full min-h-screen flex items-center justify-start flex-col gap-2">
        <header className="w-full flex items-center p-5 border-b">
          <ul>
            <li className="pointer-events-none select-none">Management</li>
          </ul>
          <button style={{position:'absolute',right:20,backgroundColor:'transparent',color:'red'}} onClick={()=>{navigate('/login');localStorage.clear()}}> ⏻ logout</button>
        </header>

        <section className="content w-full px-[50px] grid grid-cols-12  gap-3">
          {/* <div className="w-full flex items-center justify-center gap-3 flex-wrap col-span-12">
            <div className="w-[300px]">
              <img className="w-full h-full" src={icon} alt="" />
            </div>
            <button className=" text-white" onClick={showModal}>
              Create New 

              (สำหรับเทสเท่านั้น)
            </button>
          </div> */}

          <DynamicTable reload={triggerReload} />
        </section>
      </main>
    </>
  );
}
