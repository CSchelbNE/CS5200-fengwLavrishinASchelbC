import {AccordionButton, AccordionItem, AccordionPanel, Box, AccordionIcon} from "@chakra-ui/react";



const CommentAccordianItem = ({comment}) => {
    return (
    <div className="p-0">
       <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textColor="black" textAlign='left'>
                    {"Comment: #"+(comment.comment_id+24145).toString()}
                </Box>
                <AccordionIcon textColor="black" />
              </AccordionButton>
            </h2>
            <AccordionPanel borderLeft={"1px"} borderRight={"1px"} borderTop={"1px"} borderRightColor={"gray.100"} borderLeftColor={"gray.100"} borderTopColor={"gray.100"} pb={4}>
                {comment.comment_body + " - " + comment.name}
            </AccordionPanel>
      </AccordionItem>
    </div>
    )
}

export default CommentAccordianItem