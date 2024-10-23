import { Controller, useForm } from "react-hook-form";
import PageTitle from "../../../../Components/PageTitle";
import { addFiles, resetDevice } from "../../../../Services/Settings/system";
import { Alert } from "../../../../utils/alerts";
import { useEffect, useState } from "react";
import AdminTransitions from "../../../../Components/Transitions/AdminTransitions";
import DisabledPage from "./DisabledPage";
import io from 'socket.io-client'; // Assuming you're using Socket.IO on the server
import config from "../../../../config";

const Maintenance = () => {


  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // Array to store received messages

  useEffect(() => {

    const socket = new WebSocket(config.webSocketURL)

    // Connection opened
    socket.addEventListener("open", event => {
      // socket.send("Connection established")
      socket.send("1")
    });
    
    // Listen for messages
    socket.addEventListener("message", event => {
      console.log("Message from server ", event.data)
    });

    

    // const socket = io("ws://172.16.10.148:1880/ws/pdu", {
    //   reconnectionDelayMax: 10000,
    //   query: {
    //   }
    // });

    // const newSocket = io('http://172.16.10.148:1880/'); // Replace with your server URL
    // setSocket(newSocket);

    // return () => {
    //   newSocket.close(); // Clean up the socket on component unmount
    // };
  }, []);



  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    getValues,
    reset,
    setValue,
  } = useForm();
  const [progress, setProgress] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabledPage, setDisabledPage] = useState(false);

  const submitForm = async ({ file, reset }) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://172.16.10.148:1880/files");
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("reset", reset);

      xhr.addEventListener("load", function () {
        // console.log(JSON.stringify(xhr.response));
        Alert("Success", "authorized file");
        setValue("file", "");
        setIsSubmitting(false);
      });

      xhr.upload.addEventListener("progress", function (event) {
        // progress.innerHTML = "progress: " + event.loaded + " bytes sent.<br />";
        console.log(event.loaded);
        if (event.lengthComputable) {
          console.log((event.loaded / event.total) * 100);
          setProgress((event.loaded / event.total) * 100);
          // let percent = parseInt((event.loaded / event.total) * 100);
          // progress.innerHTML += "progress: " + percent + "% sent.";
        }
      });

      xhr.send(formData);

      // const { data } = await addFiles({
      //   file: file[0],
      //   reset,
      // });
      // Alert("Success", data.status);
    } catch (error) {
      setIsSubmitting(false);
      Alert("Error", error?.response?.data.status);
    }
  };

  //
  const handleResetDevice = async (Switch) => {
    try {
      const { data } = await resetDevice({
        s: Switch,
      });
      setDisabledPage(true);
      // Alert("Success", data.status);
    } catch (error) {
      Alert("Error", error?.response?.data.status);
    }
  };

  return (
    <>
      {disabledPage && <DisabledPage setDisabledPage={setDisabledPage}/>}

      <div className="my-10 mx-8">
        <PageTitle title={"Maintenance"} />

        <div className="relative px-5 py-8 border-2 border-white my-12">
          <span className="bg-[#414F63] absolute -top-3 px-2 left-3">
            Software upgrade
          </span>

          <div className="flex gap-20 items-start justify-between">
            <span>Local upgrade</span>

            <form
              onSubmit={handleSubmit(submitForm)}
              className="flex flex-col gap-3"
            >
              <div className="flex gap-3">
                <div className="flex flex-col">
                  <input
                    value={watch("file") ? watch("file")[0]?.name : ""}
                    readOnly
                    className="h-7"
                    type="text"
                    name=""
                    id=""
                  />

                  {isSubmitting ? (
                    <div class="progress mt-2 h-2">
                      <div
                        class="progress-bar progress-bar-animated progress-bar-striped progress-bar-animated "
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  ) : null}

                  {errors.file?.message ? (
                    <span className="text-red-600 text-sm mt-1">
                      {errors.file?.message}
                    </span>
                  ) : null}
                </div>

                <button
                  disabled={isSubmitting}
                  className=" w-24 block ms-auto  h-7 bg-[#167DE5] rounded-md relative "
                >
                  Browse
                  {!isSubmitting ? (
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept=".bin"
                      {...register("file", {
                        required: "File required",
                      })}
                    />
                  ) : null}
                </button>
              </div>
              <div className="flex gap-3">
                <label
                  htmlFor="reset"
                  className="text-sm flex items-center gap-2"
                >
                  <input
                    className="size-4"
                    type="checkbox"
                    id="reset"
                    {...register("reset")}
                  />
                  Reset after Upgrading
                </label>
                <button
                  disabled={isSubmitting}
                  className=" w-24 block ms-auto  h-7 bg-[#167DE5] rounded-md cursor-pointer"
                >
                  Upgrade
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative px-5 py-8 border-2 border-white inline-block">
          <span className="bg-[#414F63] absolute -top-3 px-2 left-3">
            Device
          </span>

          <div className="flex gap-12 items-start ">
            <span>System Reboot</span>
            <button
              onClick={() => handleResetDevice("reboot")}
              className=" w-24 block   h-7 bg-[#167DE5] rounded-md"
            >
              Reboot
            </button>
          </div>

          <div className="flex gap-12 items-start mt-4">
            <span>Factory reset </span>
            <button
              onClick={() => handleResetDevice("reset")}
              className=" w-24 block ms-auto  h-7 bg-[#167DE5] rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintenance;



// import useWebSocket, { ReadyState } from "react-use-websocket"

// export const Home = () => {
//   const WS_URL = "ws://127.0.0.1:800"
//   const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
//     WS_URL,
//     {
//       share: false,
//       shouldReconnect: () => true,
//     },
//   )

//   // Run when the connection state (readyState) changes
//   useEffect(() => {
//     console.log("Connection state changed")
//     if (readyState === ReadyState.OPEN) {
//       sendJsonMessage({
//         event: "subscribe",
//         data: {
//           channel: "general-chatroom",
//         },
//       })
//     }
//   }, [readyState])

//   // Run when a new WebSocket message is received (lastJsonMessage)
//   useEffect(() => {
//     console.log(Got a new message: ${lastJsonMessage})
//   }, [lastJsonMessage])

//   return <Chat lastJsonMessage={lastJsonMessage} />
// }
