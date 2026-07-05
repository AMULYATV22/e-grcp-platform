import { memo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";

function ProcurementCommentsTab({ comments: initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        user: "Current User",
        text: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add Comment
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </Stack>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Comments ({comments.length})
      </Typography>

      {comments.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="textSecondary">
            No comments yet. Be the first to comment!
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {comments.map((comment, index) => (
            <Paper key={index} sx={{ p: 2 }}>
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  {comment.user.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
                    <Typography variant="subtitle2">
                      {comment.user}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {comment.date}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {comment.text}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default memo(ProcurementCommentsTab);
