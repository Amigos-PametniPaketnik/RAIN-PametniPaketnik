import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    IconButton,
    List,
    ListIcon,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuDivider,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
    MdDarkMode,
    MdExpandLess,
    MdExpandMore,
    MdLightMode,
    MdMenu,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import {UserContext} from "../userContext";
import Login from "./Login";
import {NavLink} from "react-router-dom";

function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();

    const navigateToDiscover = (type, state) => {
        navigate(`/discover/${type}`, { state });
        if (isOpen) onClose();
    };

    return (
        <>
            <Box
                bg={useColorModeValue("gray.100", "red.800")}
                px={4}
                position={"sticky"}
                top={0}
                boxShadow={"md"}
                zIndex={2}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack alignItems={"center"} spacing={4}>
                        <IconButton
                            size={"sm"}
                            variant={"ghost"}
                            icon={
                                <MdMenu
                                    style={{
                                        transform: "translateX(65%)",
                                    }}
                                />
                            }
                            display={{
                                md: "none",
                            }}
                            aria-label={"Open Menu"}
                            onClick={isOpen ? onClose : onOpen}
                        />
                        <Heading as={Link} to={"/"} fontWeight={"normal"} size={"md"}>
                            Direct4me
                        </Heading>
                    </HStack>
                    <HStack alignItems={"center"} spacing={2}>
                        <Box display={{ base: "none", md: "block" }}>
                            <UserContext.Consumer>
                                {context => (
                                    context.user ?
                                        <>
                                            <Menu>
                                                <MenuButton
                                                    as={Button}
                                                    rounded={'full'}
                                                    variant={'link'}
                                                    cursor={'pointer'}
                                                    minW={0}>
                                                    <Avatar
                                                        size={'sm'}
                                                        src={
                                                            'https://bit.ly/dan-abramov'
                                                        }
                                                    />
                                                </MenuButton>
                                                <MenuList>
                                                    <Link to={"/profile"}><MenuItem>Moj profil</MenuItem></Link>
                                                    <Link to={"/addParcelLocker"} ><MenuItem>Paketniki</MenuItem></Link>
                                                    <MenuDivider />
                                                    <Link to={"/logout"}><MenuItem>Odjava</MenuItem></Link>
                                                </MenuList>
                                            </Menu>
                                        </>
                                        :
                                        <>
                                            <Menu>
                                                <Link to={"/login"}><MenuButton as={Button} colorScheme={'teal'} size={"sm"} ml={2}>Prijava</MenuButton></Link>
                                                <Link to={"/register"}><MenuButton as={Button} colorScheme={'teal'} size={"sm"} ml={2}>Registracija</MenuButton></Link>
                                            </Menu>
                                        </>
                                )}
                            </UserContext.Consumer>
                        </Box>
                    </HStack>
                </Flex>
            </Box>
            <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        borderBottomWidth={"1px"}
                        display={"flex"}
                        alignItems={"center"}>
                        <Heading size={"sm"} as={Link} to={"/"} onClick={onClose}>
                            Direct4me
                        </Heading>
                        <DrawerCloseButton />
                    </DrawerHeader>

                    <DrawerFooter
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderTopWidth={"1px"}>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
export default Header;