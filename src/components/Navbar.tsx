import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import BooksStats from "./BooksStats";

const Navbar = () => {
  const [streamingSites, setStreamingSites] = useState([
    {
      name: "Adlibris",
      url: "https://www.adlibris.com/se/kampanj/manadens-topplista",
    },
    { name: "Bokus", url: "https://www.bokus.com/" },
    { name: "Nextory", url: "https://www.nextory.se/" },
    { name: "BookBeat", url: "https://www.bookbeat.se/" },
    { name: "StoryTel", url: "https://www.storytel.com/se/sv/" },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Flex w="100%" flexDir={"column"} alignItems="center" mt={10}>
      <Heading mb={20} color="#fff">
        Bonnier books demo
      </Heading>
      <Flex w="65%" flexDir="row" justifyContent="space-around">
        {streamingSites.map((site, idx) => (
          <Flex
            key={idx}
            onClick={() => {
              setActiveTab(idx);
            }}
            cursor="pointer"
            borderRadius={15}
            _hover={{ backgroundColor: "#313131" }}
          >
            <Text
              color="#fff"
              p={2}
              borderBottomWidth={3}
              borderBottomColor={idx === activeTab ? "#fff" : "transparent"}
              fontSize={23}
            >
              {site.name}
            </Text>
          </Flex>
        ))}
      </Flex>

      <BooksStats site={streamingSites[activeTab]} />
    </Flex>
  );
};

export default Navbar;
