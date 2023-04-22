import { ReactNode } from 'react';
import Link from 'next/link';
import {
    IconButton,
    Box,
    Flex,
    Icon,
    Text,
    BoxProps,
    FlexProps,
    useColorModeValue
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiTrendingDown
} from 'react-icons/fi';
import {
    HamburgerIcon,
    CloseIcon,
} from '@chakra-ui/icons';
import { IconType } from 'react-icons';

interface LinkItemProps {
    name: string;
    path: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', path: "/", icon: FiHome },
    { name: 'Proposal', path: "/proposal", icon: FiCompass },
    { name: 'Vote', path: "/vote", icon: FiTrendingUp },
    { name: 'Forum', path: "/forum", icon: FiTrendingDown },
];

export const Sidebar = ({ isOpen, onOpen, onClose }: any) => {

    return (
        <Box>
            <Flex
                position="fixed"
                w={isOpen ? '230px' : '60px'}
                borderRight='1px'
                borderStyle={'solid'}
                backgroundColor={useColorModeValue('gray.100', 'darkness.900')}
                borderColor={useColorModeValue('gray.100', 'primary.100')}
            >

                <Flex minH="100vh">
                    <SidebarContent
                        onClose={onClose}
                        onOpen={onOpen}
                        isOpen={isOpen}
                    />
                </Flex>

            </Flex>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    onOpen: () => void;
    isOpen: boolean;
}

const SidebarContent = ({ onClose, isOpen, onOpen, ...rest }: SidebarProps) => {
    return (
        <Box {...rest} w="100%">
            <Flex>

                <Flex h="20" alignItems="center" pl="2">
                    <IconButton
                        onClick={isOpen ? onClose : onOpen}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                {isOpen && (
                    // <Slide direction='left' in={isOpen} style={{ zIndex: 0, width: '1', height: '0' }}>
                    <Flex h="20" w="100%" alignItems="center">
                        <Text fontSize="2xl" fontFamily="monospace" zIndex="10" fontWeight="bold">
                            TerraBIO
                        </Text>
                    </Flex>
                    // </Slide>
                )}

            </Flex>

            <Box>
                {
                    LinkItems.length > 0 && LinkItems.map((link) => (
                        <NavItem key={link.name} icon={link.icon} path={link.path} isOpen={isOpen}>
                            {link.name}
                        </NavItem>
                    ))
                }
            </Box>
        </Box >
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    path: string;
    isOpen: boolean;
    children: ReactNode;
}

const NavItem = ({ icon, children, path, isOpen, ...rest }: NavItemProps) => {
    return (
        <Flex>
            <Link href={path}>
                <Box
                    mx="1"
                    my="2"
                    w="100%"
                    borderRadius="lg"
                    style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}
                    _activeLink={{
                        color: useColorModeValue('violet.50', 'primary.100'),
                        bgColor: useColorModeValue('violet.5', 'gray.700'),
                        border: 'solid 1px'
                    }}>
                    <Flex
                        align="center"
                        w="100%"
                        m="1"
                        role="group"
                        textDecoration={'none'}
                    >

                        {icon && (
                            <Icon
                                mx="2"
                                fontSize="24"

                                _groupHover={{
                                    color: 'primary.100',
                                }}
                                as={icon}
                            />
                        )}

                        {isOpen && (
                            <Box>
                                <Text>
                                    {children}
                                </Text>
                            </Box>
                        )}

                    </Flex>
                </Box>
            </Link>
        </Flex>
    );
};