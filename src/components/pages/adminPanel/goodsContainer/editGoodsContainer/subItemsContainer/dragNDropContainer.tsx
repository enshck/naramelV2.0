import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import {
  DraggableImagesContainer,
  ImageCard,
  DroppableContainer,
  DragNDropContainer as MainContainer,
  CoverPictureContainer,
} from "../styles";
import { ISubGoodsElement } from "components/pages/items";

interface IProps {
  onDragEnd: (result: DropResult) => void;
  changedSubItem: ISubGoodsElement;
}

const DragNDropContainer = ({ onDragEnd, changedSubItem }: IProps) => {
  return (
    <MainContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableContainer>
          <Droppable droppableId={"droppable"} direction={"horizontal"}>
            {(provided, snapshot) => (
              <DraggableImagesContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <CoverPictureContainer />
                {changedSubItem.images.map((elem, key) => (
                  <Draggable draggableId={`${key}`} index={key}>
                    {(provided, snapshot) => (
                      <ImageCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={elem} alt={elem} />
                      </ImageCard>
                    )}
                  </Draggable>
                ))}
              </DraggableImagesContainer>
            )}
          </Droppable>
        </DroppableContainer>
      </DragDropContext>
    </MainContainer>
  );
};

export default DragNDropContainer;
