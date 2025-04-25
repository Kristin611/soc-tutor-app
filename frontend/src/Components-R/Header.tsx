import { Box, Heading, Link } from '@chakra-ui/react';

const pages = [
  {name: 'Log In', path: '/log-in', showWhenLoggedIn: false},
  {name: 'Create an Account', path: '/sign-up', showWhenLoggedIn: false},
  {name: 'Dashboard', path: '/dashboard', showWhenLoggedIn: true},
  {name: 'Account Details', path: '/profile', showWhenLoggedIn: true}
];

type Props = {
  loggedIn: boolean;
}

const Header = ({loggedIn}: Props) => {
  return (
    <Box border='solid' display='flex' alignItems='center'>
      <Box border='solid' p={5} m={3} display='flex'>
        <Heading>Sociology Tutor App</Heading>
      </Box>
      <Box display='flex' justifyContent='space-around' border='solid' w='75%'>
        {pages.map((page) => {
          if (
            (loggedIn && page.showWhenLoggedIn) ||
            (!loggedIn && !page.showWhenLoggedIn)
          ) {
            return <Link href={page.path} key={page.name}>
                    <Box>{page.name}</Box>
                  </Link>
            } else {
            return  null;
          }
                  
        })}
      </Box>
    </Box>
  )
}

export default Header