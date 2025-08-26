import { Box, Typography, Paper } from "@mui/material";

function ChatMessage({ sender, time, content, isItMyMessage }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: isItMyMessage ? "flex-end" : "flex-start",
				mb: 1,
			}}
		>
			<Paper
				elevation={2}
				sx={{
					maxWidth: "70%",
					p: 1.5,
					bgcolor: isItMyMessage ? "#a5f3a1" : "#93c5fd",
					borderRadius: 3,
					borderTopRightRadius: isItMyMessage ? 0 : 12,
					borderTopLeftRadius: isItMyMessage ? 12 : 0,
				}}
			>
				{!isItMyMessage && (
					<Typography
						variant="subtitle2"
						sx={{ fontWeight: "bold", mb: 0.5 }}
					>
						{sender}
					</Typography>
				)}
				<Typography variant="body1">{content}</Typography>
				<Typography
					variant="caption"
					sx={{ display: "block", mt: 0.5, textAlign: "right", opacity: 0.7 }}
				>
					{time}
				</Typography>
			</Paper>
		</Box>
	);
}

export default ChatMessage;
