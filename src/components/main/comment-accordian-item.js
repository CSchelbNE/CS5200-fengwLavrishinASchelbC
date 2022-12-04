import {AccordionButton, AccordionItem, AccordionPanel, Box, AccordionIcon} from "@chakra-ui/react";



const CommentAccordianItem = ({comment}) => {
    return (
    <div className="p-0">
       <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textColor="black" textAlign='left'>
                    {"Comment: #"+comment.comment_id}
                </Box>
                <AccordionIcon textColor="black" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {comment.comment_body}
            </AccordionPanel>
      </AccordionItem>
    </div>
    )
}

export default CommentAccordianItem