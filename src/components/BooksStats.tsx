import { Button, flattenTokens, Flex, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { bookList } from "../helpers/bookList";
import { StramingSiteType } from "../types/StreamingSiteType";

const BooksStats: React.FC<StramingSiteType> = ({ site }) => {
  const [scrapingData, setScrapingData] = useState([]);
  const [results, setResults] = useState(0);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkBooks = async (arr: Array<string>) => {
    arr.forEach((title) => {
      bookList.forEach((book) => {
        console.log(book);

        if (title === book) {
          setResults((p) => p + 1);
        }
      });
    });
  };

  const scrapePopularBooks = () => {
    setLoading(true);
    setResults(0);
    setReady(false);

    axios
      .post("https://book-scrapper077.herokuapp.com/scrapeBook", {
        url: site.url,
        titles: bookList,
      })
      .then(async (res) => {
        if (res.status === 200) {
          setScrapingData(res.data.results);
          await checkBooks(res.data.results);
          setReady(true);
          setLoading(false);
        }
      });
  };

  return (
    <Flex w="65%" mt="80px" flexDir="column" alignItems="center">
      {site.name !== "Adlibris" ? (
        <Text color="white">{site.name}</Text>
      ) : (
        <>
          <Button
            onClick={scrapePopularBooks}
            w={250}
            mb={50}
            disabled={loading}
          >
            Check book performance
          </Button>

          {ready ? (
            <Flex
              w="100%"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                color="white"
                fontSize={25}
              >{`${results} of your books from ${bookList.length} are popular books last month`}</Text>
            </Flex>
          ) : (
            loading && (
              <Flex
                w="100%"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner color="white" />
                <Text color="white" fontWeight="bold">
                  Checking Books
                </Text>
              </Flex>
            )
          )}
        </>
      )}
    </Flex>
  );
};

export default BooksStats;
