import React, { useState } from 'react';
import './RoomThree.css';
import QuestionModal from '../../modals/QuestionModal.jsx'; 
import ObjectBorder from '../../components/ObjectBorder.jsx';

function RoomTwo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [hover, setHover] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestionSubmit = (selectedOption) => {

    console.log('Form submitted. The user selected:', selectedOption);
    setIsModalOpen(false);

  };

  return (

    <main className="room-three">
      {/*Coffee Machine*/}
      <ObjectBorder onClick={handleOpenModal} svgPath="M0.5 66V1H209.5V70.5H184.5V137.5H209.5V167.5C209.5 170.7 70.1667 168.833 0.5 167.5V137.5H24.5V70.5H0.5V66Z" width="210" height="170" viewBox="0 0 210 170" className="room-three__coffee-machine"/>

      {/*Coffee Menu*/}
      <ObjectBorder onClick={handleOpenModal} svgPath="M0.5 4.5V5M0.5 5V216H6V221.5H10V227H15.5H700L705 225V221.5C706.667 222.167 710 223.1 710 221.5C710 219.9 710 217.167 710 216H715.5L713.5 0.5H416V32H422V37.5H427V42H431.5V46.5H435.5V51H440V55H444.5V61H449.5V64.5H454V71H458.5L459.5 74.5H463.5V84H458.5V89H444.5L445.5 93.5H426.5V97.5H417V102.5H397L397.5 98.5H388.5V93.5H369.5V89C364.833 89.3333 355.5 89.8 355.5 89C355.5 88.2 355.5 85.3333 355.5 84H350V74.5H355.5V70H361L360 65.5H364.5V61H369.5V56H374V51H378.5V46.5H383.5L383 41.5H388.5V37.5H393.5V32H397.5V0.5H0.5V5Z"  width="716" height="228" viewBox="0 0 716 228" className="room-three__coffee-menu"/>

      {/*Coffee Pot*/}

      <ObjectBorder onClick={handleOpenModal} svgPath="M34.5 9.5V2.5V0.5H80.5L82 9.5H100.5V24H104.5V20H133V24H138V29H142.5V35H147V62.5H138V72.5H128V75.5L124.5 77.5V81.5H120V85.5H104.5V95H100.5V100.5H95.5V105H90.5V110.5H19.5V105H15V100.5H10.5V95H6V85.5H0.5V53H6V45L10.5 43V35H19.5V29H15V24H10.5V20H6V9.5H34.5Z" width="148" height="111" viewBox="0 0 148 111" className="room-three__coffee-pot"/>

      {/*Plant*/}

      <ObjectBorder onClick={handleOpenModal} svgPath="M42.5 1H52.5V6H48V10H52.5V19H57.5V29H61.5V24.5H66V38.5H62.5V42.5H71.5V47.5H75.5V52.5V85.5H71.5V100H66V119H62.5V123.5H15.5V119L10 118V109.5V101H5V85.5H0.5V71H5V66.5H0.5V57.5H10V52.5H5L6 44H10V38.5H6V33.5H19V29H15V19H24V24.5H29V11H38V6H42.5V1Z" width="76" height="124" viewBox="0 0 76 124" className="room-three__plant"/>

      {/*Stool*/}

      <ObjectBorder onClick={handleOpenModal} svgPath="M44 1H161L162.5 5H171V11.5H175.5V61.5H171V78H175.5V110.5L180.5 112V147H185.5V182H189.5V215H195.5V253H199.5V285.5H189.5V258H185.5V237H110.5V253H113.5V285.5H104V263V258H101V263H95.5V281H86.5V258H90.5V238H15.5V260.5H9V281H0.5V258H6V220.5H11.5V186.5H16.5V153.5H19V116.5H24.5V82H29.25V61.5H24.5V17.5H29V12.5H34V7.5H44V1Z" width="200" height="286" viewBox="0 0 200 286" className="room-three__stool"/>


      <QuestionModal
        show={isModalOpen}
        onCancel={handleCloseModal}
        question="Which is the correct answer?"
        options={['Option A', 'Option B', 'Option C', 'Option D']}
        onSubmit={handleQuestionSubmit}
      />

    </main>
  );
}

export default RoomTwo;

