import { redirectToHome } from 'helpers/auth/redirect';
import composedPageHoc from 'components/HOC/composedPageHoc';
import { getInitialData } from "helpers/initialize/initialize";

const Home = () => null;

getInitialData(Home, [], [], redirectToHome);

export default composedPageHoc(Home);
