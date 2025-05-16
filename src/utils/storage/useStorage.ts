import sessionStorage from "./sessionStorage"
import localStorage from "./localStorage";

const useStorage = () => {
  return {
    sessionStorage,
    localStorage
  }
};

export default useStorage;
