import { Box, Text, IconButton, Input } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useState } from "react";
import { MdEdit, MdCheck } from "react-icons/md";
import { forwardRef } from "react";
import { IconBaseProps } from "react-icons";
import { isInvalidEmail } from "@/utils/emailValidation";
import { Data } from "@/Pages/ProfilePage";

type Props = {
    field: string;
    value: string;
    username: string;
    setData: React.Dispatch<React.SetStateAction<Data>>;
}

// Wrapping MdEdit with forwardRef due to the error: 'Warning Function components cannot be given refs.'
const ForwardRefMdEdit = forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <div ref={ref}>
      <MdEdit {...props} />
    </div>
  ));
  
  // Wrapping MdCheck with forwardRef due to the error: 'Warning Function components cannot be given refs.'
  const ForwardRefMdCheck = forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <div ref={ref}>
      <MdCheck {...props} />
    </div>
  ));

export const AcctDetailsRow = ({field, value, username, setData }: Props) => {
    const [updateIcon, setUpdateIcon] = useState(false);
    const [editText, setEditText] = useState(value); 

    const handleTextChange = (e: any) => {
        setEditText(e.target.value);
    }

    const handleIconChange = () => {
            setUpdateIcon(!updateIcon); // NOTupdateField allows us to toggle back and forth between MdEdit and MdCheck
        }

    const handleTextUpdate = async () => {
        //validate email if user updates it in their account details
        if (field === 'Email') {
            const invalidEmail = isInvalidEmail(editText);
            if (invalidEmail) {
                toaster.create({
                    title: 'Error',
                    description: 'Please enter a valid email.',
                    duration: 3000,
                  });
                  return;
            };
            //console.log('INVALID EMAIL', invalidEmail);
        }

        //check if fields are empty and if so generate error message
        if (editText === '') {
            toaster.create({
                title: 'Error',
                description: `${field} cannot be empty. Please enter a valid ${field}.`,
                duration: 3000,
              });
              return;
        }
        
        const token = localStorage.getItem('token');

        // console.log('TOKEN', token);
        // console.log('USERNAME:', username);

        setUpdateIcon(!updateIcon); //to toggle checkmark icon back to edit/penci icon

        try {
        const response = await axios.post('http://localhost:3000/auth/change-account-detail', {
            username, //using username (vs. id) as the unique identifier when making the request to update the values of the field
            field: field.toLowerCase(), //since the name field in db is lowercase but uppercase on frontend
            value: editText
        }, { headers: { Authorization: `Bearer ${token}` } });

       // console.log('ACCT DTLS ROW', response);
       console.log('RESPONSE DATA', response.data);
       setData(response.data);

        toaster.create({
            title: 'Success!',
            description: 'We have updated your account details!',
            duration: 3000,
          });

        return response;
        
        } catch (error) {
            console.log('ACCT DETAILS ERROR', error);

            toaster.create({
                title: 'Error',
                description: 'There was an error. Please review your values and try again!',
                duration: 3000,
              });
    
        }
    } 
        
  return (
    <Box display='flex' gap={2}>
        <Text flex={2} lineHeight='32px'>{field}:</Text>
        {updateIcon ? (
            <Input flex={2} h='32px' value={editText} onChange={handleTextChange}/>
        ) : (
            <Text flex={2} lineHeight='32px'>{editText}</Text>
        )}
        
        <IconButton
            onClick={updateIcon ? handleTextUpdate : handleIconChange}
            aria-label='Edit profile'
            asChild 
            size='xs'
            color="red"
        >
            {updateIcon ? <ForwardRefMdCheck /> : <ForwardRefMdEdit />}
        </IconButton>                  
    </Box>
  )
}
