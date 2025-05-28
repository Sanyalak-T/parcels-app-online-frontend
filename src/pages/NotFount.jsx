import React from "react";
import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="bg-violet-700 text-white text-2xl font-semibold flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full">
			<h1 className="m-4 text-6xl">404 Not Found</h1>
			<Link
				to="/"
				className="underline underline-offset-8 hover:text-amber-400"
			>
				Back to Login Page!
			</Link>
		</div>
	);
};

export default NotFound;
