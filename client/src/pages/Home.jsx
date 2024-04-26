import React, { useState } from "react";
import Container from "../components/Container";
import LandingPage from "../components/LandingPage";
import IntroText from "../components/IntroText";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import Button from "../components/Button";
import DisplaySynonyms from "../components/DisplaySynonyms";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [displaySynonyms, setDisplaySynonyms] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  return (
    <Container searchTerm={searchTerm} setDisplaySynonyms={setDisplaySynonyms}>
      {!openModal && (
        <LandingPage
          displaySynonyms={displaySynonyms}
          /*  setDisplaySynonyms={setDisplaySynonyms} */
        >
          <IntroText
            setOpenModal={setOpenModal}
            setDisplaySynonyms={setDisplaySynonyms}
          />
          <SearchBar
            setDisplaySynonyms={setDisplaySynonyms}
            setSearchTerm={setSearchTerm}
          />
          <Button
            setOpenModal={setOpenModal}
            setDisplaySynonyms={setDisplaySynonyms}
          />
        </LandingPage>
      )}
      <Modal openModal={openModal} onClose={() => setOpenModal(false)} />

      {displaySynonyms && <DisplaySynonyms />}
    </Container>
  );
};

export default Home;
