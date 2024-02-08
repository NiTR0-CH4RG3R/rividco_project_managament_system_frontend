import { AuthContext } from "./AuthContextProvider";
import { useXContext } from "../Contexts/Contexts";

const useAuthContext = () => useXContext(AuthContext);

export default useAuthContext;