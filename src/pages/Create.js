import { useState } from "react";
import {
	Typography,
	Button,
	Container,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import { Details } from "@material-ui/icons";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	field: { marginTop: 20, marginBottom: 20, display: "block" },
});

export default function Create() {
	const classes = useStyles();
	const history = useHistory();
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [category, setCategory] = useState("todos");

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailsError(false);
		if (title == "") {
			setTitleError(true);
		}

		if (details == "") {
			setDetailsError(true);
		}

		if (title && details) {
			fetch("http://localhost:8000/notes", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ title, details, category }),
			}).then(() => history.push("/"));
		}
	};
	return (
		<Container>
			<Typography
				variant="h6"
				color="secondary"
				component="h2"
				gutterBottom
			>
				Create a new note
			</Typography>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => setTitle(e.target.value)}
					className={classes.field}
					label="Notes Title"
					variant="outlined"
					color="secondary"
					fullWidth
					required
					error={titleError}
				/>

				<TextField
					onChange={(e) => setDetails(e.target.value)}
					className={classes.field}
					multiline
					rows={4}
					label="details"
					variant="outlined"
					color="secondary"
					fullWidth
					required
					error={detailsError}
				/>
				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel
							value="money"
							control={<Radio />}
							label="Money"
						/>
						<FormControlLabel
							value="todos"
							control={<Radio />}
							label="Todos"
						/>
						<FormControlLabel
							value="reminders"
							control={<Radio />}
							label="Reminders"
						/>
						<FormControlLabel
							value="work"
							control={<Radio />}
							label="Work"
						/>
					</RadioGroup>
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					endIcon={<KeyboardArrowRightIcon />}
				>
					submit
				</Button>
			</form>
		</Container>
	);
}
