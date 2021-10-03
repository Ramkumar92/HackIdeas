import { useHistory } from "react-router";
import { getCookie } from "../../utils/cookies";

const AuthManager = () => {

    const history = useHistory();

    if (!getCookie('hack_auth_cookie')) {
        history.push("/login");
    } else if (history.location.pathname.includes("/login")) {
        history.push("/");
    }

    return <></>;
}

export default AuthManager;