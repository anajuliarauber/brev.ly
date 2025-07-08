import { Form } from '../components/Form';
import { Logo } from '../components/icons/Logo';
import { List } from '../components/List';

const Home = () => {
  return (
    <div className="min-h-screen w-full p-4 bg-gray-200 font-primary flex justify-center">
      <div className="w-full max-w-[366px] flex flex-col gap-4 ">
        <div className="flex flex-col gap-6 mt-9">
          <Logo />
          <Form />
        </div>
        <List />
      </div>
    </div>
  );
};
export default Home;
