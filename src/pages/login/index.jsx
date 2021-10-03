import { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/button";
import Grid from "../../components/grid";
import Input from "../../components/input";
import { setCookie } from "../../utils/cookies";
import './style.css';

const Login = () => {
    const history = useHistory();
    const [employeeID, setEmployeeID] = useState('');

    return (
        <Grid container
            className="login__container">
            <Grid xs={12}>
                <h1 className='login__header'>Hack Ideas</h1>
            </Grid>
            <Grid xs={12}>
                <Input
                    autoFocus
                    placeholder='Employee ID'
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                />
            </Grid>
            <Grid xs={12}>
                <Button
                    label="Login"
                    onClick={() => {
                        setCookie('hack_auth_cookie', employeeID, 1);
                        history.push('/');
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default Login;
