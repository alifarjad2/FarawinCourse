/* eslint-disable react-hooks/exhaustive-deps */
import farawin from "farawin";
import { useEffect, useState } from "react";
import useSWR from "swr";

function useGetUserList() {
  const [userList, setUserList] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://farawin.iran.liara.run/api/user");
        const data = await response.json();
        // throw " sds خطایی روی داد";
        console.table(data.userList);
        setUserList(data.userList);
      } catch (e) {
        setUserList([]);
        setError(e);
      }
    };

    fetchData();
  }, []);

  return [userList, error, userList == null];
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetchWithToken = (url) =>
  fetch(url, {
    headers: {
      authorization: localStorage.token,
    },
  }).then((res) => res.json());

const farawinFetch = ({ type, url, data }) => farawin.fetch(type, url, data);
const farawinGetChats = (param) => farawin.getChats();

const temp = () => {};
export default function Api() {
  const [value, setValue] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  //   const [userList, error] = useGetUserList();
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR("https://farawin.iran.liara.run/api/user", fetcher);

  const {
    data: contactData,
    error: contactError,
    isLoading: contactLoading,
  } = useSWR("https://farawin.iran.liara.run/api/contact", fetchWithToken);

  const {
    data: chatData,
    error: chatError,
    isLoading: chatLoading,
  } = useSWR("asdsa", farawinGetChats);

  console.log(chatData);

  if (userError || contactError || chatError)
    return <div>{(userError || contactError || chatError) + ""}</div>;
  //   if (userLoading) return <div>Loading...</div>;
  //   if (userError != null) return <div>{userError}</div>;

  //   console.table(chatData?.chatList);
  //   console.table(contactData?.contactList);
  //   console.table(userData?.userList);

  const sendChat = async (text, to) => {
    console.log("sendChat", text, to);

    try {
      setSendLoading(true);
      const response = await fetch("https://farawin.iran.liara.run/api/chat", {
        headers: {
          authorization:
            "eyJ1c2VybmFtZSI6IjA5MDAwMDAwMDAwIiwicGFzc3dvcmQiOiJ4eHh4eHh4eCIsIm5hbWUiOiJ4eHgiLCJkYXRlIjoiMjAyMy0wNy0wN1QxMjo1Nzo0MS42NjRaIn0=",
          "content-type": "application/json",
        },
        body: JSON.stringify({ contactUsername: to, textHtml: text }),
        method: "POST",
      }).then((res) => res.json());

      console.log(response);
      if (response.code == "200") alert("پیام شما ارسال گردید");
      if (response.code != "200") alert(response.message);
    } catch (e) {
      console.log(e);
    }

    setSendLoading(false);
  };

  //success
  return (
    <div className="flex">
      <div className="flex flex-col">
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button
          onClick={() => sendChat(value, "09393013397")}
          disabled={sendLoading}
        >
          {sendLoading ? "loading" : "send chat"}
        </button>
      </div>

      <div className="flex flex-col flex-1">
        {userLoading && "User Loading ..."}
        {!userLoading && userData.userList.map((i) => <div>{i.username}</div>)}
      </div>

      <div className="flex flex-col flex-1">
        {contactLoading && "Contact Loading ..."}
        {!contactLoading &&
          contactData?.contactList.map((i) => <div>{i.name}</div>)}
      </div>

      <div className="flex flex-col flex-1">
        {chatLoading && "Chat Loading ..."}
        {!chatLoading && chatData?.chatList.map((i) => <div>{i.text}</div>)}
      </div>
    </div>
  );
}
