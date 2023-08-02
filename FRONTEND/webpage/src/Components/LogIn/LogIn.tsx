// eslint-disable-next-line import/named
import { ActionFunctionArgs, Form } from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";
import { store } from "@/Store/store.ts";
import { signIn } from "@/Store/userSlice.ts";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const formDatas = Object.fromEntries(formData);

  // userName: string = formDatas.id;

  // store.dispatch(signIn({ name: formDatas.id }));

  // 로그인 버튼 눌렀을 경우

  store.dispatch(signIn({ id: formDatas.id.toString() }));

  return null;
}

function LogIn() {
  // function loginHandler() {
  //   dispatch(signIn({ name: "안녕" }));
  //   sessionStorage.setItem("loginState", "isLoggedIn");
  //   sessionStorage.setItem("loginUser", "안녕");
  // }

  // const sessionStorage = window.sessionStorage;

  return (
    <>
      <div className="flex items-center justify-center">
        <Form method="post">
          <Grid container spacing={4} columns={11}>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <TextField
                  id="standard-basic"
                  label="ID"
                  variant="standard"
                  name="id"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full">
                <TextField
                  id="standard-basic"
                  label="password"
                  variant="standard"
                  name="pw"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center justify-center w-full h-16">
                <Button variant="contained" type="submit" className="text-xs">
                  로그인
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    </>
  );
}

export default LogIn;
