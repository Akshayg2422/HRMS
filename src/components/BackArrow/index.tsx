import React from 'react';
import {ImageView,Container} from '@components';
import { Icons } from "@assets";
import {goBack, useNav} from '@utils';


const BackArrow: React.FC = () => {
    const navigation = useNav();
  return (
    <Container  height={25} width={25}>
       <Container
              col={'col'}
              additionClass={'mt-sm-3'}
              justifyContent={"justify-content-center"}
              alignItems={"align-items-center"}
              onClick={()=>goBack(navigation)}
            >
        <ImageView
          icon={Icons.Delete}
          height={20}
          width={20}
        //   tintColor={colors.brand}
        />
      
      </Container>
    </Container>
  );
};
export default BackArrow;
