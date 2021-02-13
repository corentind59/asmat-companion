import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const MuiToastContainer: FC = () => (
  <ToastContainer position="top-center"
                  autoClose={5000}
                  closeButton={false}
                  toastStyle={{
                    padding: 0
                  }}
                  bodyStyle={{
                    padding: 0
                  }}/>
);

export default MuiToastContainer;
