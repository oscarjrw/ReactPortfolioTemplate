import React from 'react';
import Style from "./Terminal.module.scss";
import classNames from "classnames";
import {Box} from "@mui/material";

const iconClass = "fa fa-circle";

function Terminal(props) {
   const {text, title} = props;

   return (
      <Box component={'section'} className={classNames(Style.shadowed)}
           width={{xs: '80%', md: '50%'}} borderRadius={'0.5rem'} mb={'4rem'}>
         <Box style={{backgroundColor: "darkgrey"}} p={'0.5rem'} borderRadius={'0.5rem 0.5rem 0 0'}
              fontSize={'1rem'}>
            <i className={classNames(iconClass, Style.red)}/>
            <i className={classNames(iconClass, Style.amber)}/>
            <i className={classNames(iconClass, Style.green)}/>

             <b style={{marginLeft: '1em'}}>{title}</b>


         </Box>
         <Box py={{xs: '1rem', md: '2rem'}} px={{xs: '2rem', md: '3rem'}} borderRadius={'0 0 0.5rem 0.5rem'}
              fontSize={'1.2rem'} fontFamily={'Calibri light'}>
            {text}
         </Box>
      </Box>
   );
}

export default Terminal;