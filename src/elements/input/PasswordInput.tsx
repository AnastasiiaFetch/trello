import { forwardRef, useState } from 'react';
import EyeOpen from '../../elements/icons/EyeOpen';
import EyeOff from '../../elements/icons/EyeOff';
import Input from './Input';

const PasswordInput = (props: any, ref: any) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const Icon = isPasswordHidden ? EyeOff : EyeOpen;
  return (
    <Input
      type={isPasswordHidden ? 'password' : 'text'}
      ref={ref}
      rightElement={
        <Icon
          size="20"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsPasswordHidden(prevState => !prevState)}
        />
      }
      {...props}
    />
  );
};

export default forwardRef(PasswordInput);
