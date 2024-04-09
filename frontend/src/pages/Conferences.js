import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConferenceList = () => {
    const navigate = useNavigate();

    const conferences = [
        { name: 'TMLR', details: 'Transactions on Machine Learning Research (TMLR) is a venue for dissemination of machine learning research that is intended to complement JMLR while supporting the unmet needs of a growing ML community. TMLR emphasizes technical correctness over subjective significance, in order to ensure we facilitate scientific discourses on topics that are deemed less significant by contemporaries but may be so in the future. TMLR caters to the shorter format manuscripts that are usually submitted to conferences, providing fast turnarounds and double blind reviewing. MLR employs a rolling submission process, shortened review period, flexible timelines, and variable manuscript length, to enable deep and sustained interactions among authors, reviewers, editors and readers. TMLR does not accept submissions that have any overlap with previously published work. For more information on TMLR, visit jmlr.org/tmlr'  },
        { name: 'Conference 2', details: 'Details for Conference 2' },
        { name: 'Conference 3', details: 'Details for Conference 3' },
        // Add more conferences as needed
    ];

    const handleUpload = (conference_name, conference_details) =>{
        navigate('/upload', {replace: true, state: {conference_name, conference_details}});
    }
    
    const conferenceBoxStyle = {
        border: '1px solid #3f51b5',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '4px',
    };

    const detailsStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    };

    return (
        <Container>
            {conferences.map((conference, index) => (
                <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {conference.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={detailsStyle}>
                        Details: {conference.details}
                    </Typography>
                    <Button variant="submit" component="span" onClick={() => {handleUpload(conference.name, conference.details)}}>
                        Upload
                    </Button>
                </Box>
            ))}
        </Container>
    );
};

export default ConferenceList;
