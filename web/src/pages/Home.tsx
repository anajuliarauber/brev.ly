import { Form } from '../components/Form';
import { Logo } from '../components/icons/Logo';
import { List } from '../components/List';

const Home = () => {
  return (
    <div className="min-h-screen w-full p-4 bg-gray-200 font-primary flex justify-center lg:pt-15">
      <div className="w-full flex flex-col gap-4 justify-center items-center lg:flex-row lg:gap-8 lg:items-start">
        <div className="flex flex-col w-full max-w-[366px] gap-6 mt-9">
          <Logo />
          <Form />
        </div>
        <div className="w-full max-w-[366px] lg:max-w-[580px] lg:mt-21">
          <List />
        </div>
      </div>
    </div>
  );
};
export default Home;
