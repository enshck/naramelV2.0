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
  DeleteButton,
} from "../styles";
import { ISubGoodsElement } from "components/pages/items";
import { ReactComponent as Delete } from "assets/adminPanel/delete.svg";

interface IProps {
  onDragEnd: (result: DropResult) => void;
  changedSubItem: ISubGoodsElement;
  deleteItemImageHandler: (imageIndex: number) => void;
}

const DragNDropContainer = ({
  onDragEnd,
  changedSubItem,
  deleteItemImageHandler,
}: IProps) => {
  const { images } = changedSubItem;

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
                {images.map((elem, key) => (
                  <Draggable draggableId={`${key}`} index={key}>
                    {(provided, snapshot) => (
                      <ImageCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DeleteButton
                          onClick={() => deleteItemImageHandler(key)}
                          isHidden={images.length <= 1 && key === 0}
                        >
                          <Delete />
                        </DeleteButton>
                        {typeof elem === "string" ? (
                          <img src={elem} alt={elem} />
                        ) : (
                          <img src={URL.createObjectURL(elem)} alt={"da"} />
                        )}
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
