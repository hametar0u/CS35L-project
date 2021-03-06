
import { useState, useEffect } from 'react';
import axios from "axios";
import defaultAnime from "./defaultAnime.svg";
import { AnimatePresence } from "framer-motion";
import { CardWrapper } from "./MotionComponents";

const JoinListCard = (props) => {
  return(
      <div className="bg-lightgrey border-2 border-lightgrey hover:border-blue hover:shadow-md p-5 rounded-lg flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 justify-between">
                <button 
                  className="order-last bg-blue items-center rounded-full justify-center w-1/3 h-5 text-xs text-white" 
                  onClick={() => {
                    props.joinNewList();
                    props.setTargetList(props.listid);
                  }}>
                    Join
                </button>
                <div className=""><div className="order-first text-sm">{props.owner}'s list</div></div>
          </div>
            <div className="flex flex-row">
              {props.images.map((image, i) => {
                return <img className="w-1/4 h-15" src={image} key={i}/>;
              })}
            </div>
      </div>
  );
};

const JoinList = (props) => {
  return ( 
    <div className="grid grid-cols-1 gap-10">
        {props.otherSharedLists.map((list, i) => {
          return (
            <AnimatePresence>
                <CardWrapper>
                  <JoinListCard 
                    owner={list.username} 
                    listid={list.id}
                    images={list.anime} 
                    joinNewList={props.joinNewList}
                    setTargetList={props.setTargetList}
                  />
                </CardWrapper>
            </AnimatePresence>
          );
        })}
    </div>
  );
};
 
export default JoinList;