import { Context } from "../App";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, Text, Avatar } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { AcctDetailsRow } from "@/Components-R/Profile/AcctDetailsRow";
import { useState } from "react";



//use type if get an error when doing data.name/username/email
export type Data = {
    email: string;
    name: string;
    username: string;
}

//getValue is used as a function in case data isn't ready yet, or if I want to transform values later like masking email. This makes it flexible.
const profileFields = [
    { id: 'name', field: 'Name', getValue: (data: any) => data.name},
    { id: 'email', field: 'Email', getValue: (data: any) => data.email},
    { id: 'username', field: 'Username', getValue: (data: any) => data.username},
    {id: 'password', field: 'Password', getValue: () => '*********'}
];

const Profile = () => {
    const loaderData = useLoaderData() as Data;
    const [data, setData] = useState(loaderData); //so the data automatically refreshes when the user updates account details
    const navigate = useNavigate();
    //console.log('LOADER DATA:', data);

    const context = useOutletContext() as Context;
    //console.log('CONTEXT:', context);

    //console.log('PROFILE DATA', data)

    const handleLogout = () => {
        localStorage.removeItem('token'); //if token is removed from local storage, user is automatically signed out
        context.toggleLoggedIn();
        navigate('/log-in');

         toaster.create({
                  title: 'Success',
                  description: 'You have been logged out of your account.',
                  duration: 3000,
                })
    }

    return (
        <Box>
            <Text textAlign='center' mb={4} fontSize={20}>
                Account Details
            </Text>
            <Text textAlign='center'>Welcome, {data.name}! You can manage your account details here.</Text>
            <Box  display='flex' w='60%' gap={10} m='0 auto' py={20}>
                <Box>
                    <Avatar.Root name={data.name} size='2xl' colorPalette='teal'>
                        <Avatar.Fallback />
                        {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                    </Avatar.Root>
                </Box>
                
                <Box w='100%' display='flex' flexDirection='column' gap={3}>
                    {profileFields.map(({ id, field, getValue}) => (
                        <AcctDetailsRow key={id} field={field} value={getValue(data)} username={data.username} setData={setData}/>
                    ))}
                    {/* the above code profileFields.map() is a mapped out version of the below to make the code more DRY*/}
                    {/* <AcctDetailsRow field='Name' value={data.name}/>
                    <AcctDetailsRow field='Email Address' value={data.email}/>
                    <AcctDetailsRow field='Username' value={data.username}/>
                    <AcctDetailsRow field='Password' value='*********'/> */}
                </Box>
            </Box>
            <Box display='flex' gap={4} justifyContent='center'>
                <Button w='11%' onClick={handleLogout}>Log Out</Button>
                <Button onClick={() => {console.log('delete')}}>Delete Account</Button>
            </Box>
            
        </Box>
)
};

export default Profile;