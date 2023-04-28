import React from "react";

import Note from "./Note";

export default function Home() {
  return (
    <div
      style={{
        background:
          "url('https://images.unsplash.com/photo-1505444226624-239b421655ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI0fHxzaGFwZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60') center/cover",
      }}
    >
      {" "}
      <Note />
    </div>
  );
}
