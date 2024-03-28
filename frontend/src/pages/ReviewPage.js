import React, { useState } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
// import Link from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Comment from "../components/Comment";

function ReviewPage() {
  const [filePath, setFilePath] = useState("");


  // TO DO:

  // Authors should be made variable, linked to their profiles
  // link to the paper to be integrated
  // title to be integrated
  // abstract to be integrated

  // Authors visibility changes
  // Reviewer visibility changes
  // Comments / Reviews to be recorded, streamlined properly
  // Comment components should be such that it is like a thread to the main comment / review.

  let link = "pdf?id=" + 1234;
  let title = "In sample softmax for offline reinforcement learning";
  let Authors = "Swaminathan S K, Bruh Hathkayosaurus";
  let Abstract = "In this work, we considered the problem of learning action-values and corresponding policies from a fixed batch of data. The algorithms designed for this setting need to account for the fact that the action-coverage of the data distribution may be incomplete, that is certain state-action transitions are not present in the dataset. The core issue faced by Offline RL methods is insufficient action-coverage which leads to overestimation or divergence in learning during the bootstrapping update. We critically examine the In-Sample Softmax (INAC) algorithm for Offline Reinforcement Learning (RL), addressing the challenge of learning effective policies from pre-collected data without further environmental interaction using an in-sample softmax. Through extensive analysis and comparison with other in-sample algorithms like In-sample Actor-Critic (IAC)  and Batch-Constrained Q-learning (BCQ) , we investigate INAC's efficacy across various environments, including tabular, continuous, and discrete domains, as well as imbalanced datasets. We find that the INAC, when benchmarked against state-of-the-art offline RL algorithms, demonstrates robustness to variations in data distribution and performs comparably, if not superiorly, in all scenarios. We do a comprehensive evaluation of the capabilities and the limitations of the In-Sample Softmax method within the broader context of offline reinforcement learning.";

  let comment = "Summary Of Contributions: This study investigates the In-Sample Softmax (INAC) algorithm for Offline RL, focusing on learning from fixed datasets with incomplete action coverage. It compares INAC to similar algorithms across various environments, revealing its robust performance and competitive advantages. The analysis underscores INAC's potential in addressing offline RL challenges. \n Strengths And Weaknesses: \n Strength:This paper is clearly written and easy to follow.";
  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "left"}}>
        {title} <IconButton href={link}><ArticleIcon variant="contained">Access PDF</ArticleIcon></IconButton>

        <Typography variant="body2" gutterBottom>
        {Authors}
        </Typography>
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Abstract:
      </Typography>
      <Typography variant="body2" gutterBottom>
        {Abstract}
      </Typography>

      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Reviews:
      <Comment disable="True" comment={comment}/>
      <Comment disable="True" comment={comment} user="10ewY"/>
      <Comment/>
      </Typography>
    </Container>
  );
  
}

export default ReviewPage;
