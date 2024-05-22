import { io } from "socket.io-client";

// const URL = "http://localhost:5000";
const URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const socket = io(URL);

export default socket;
