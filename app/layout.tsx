import type {PropsWithChildren} from "react";
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'PlayGist',
	description: 'Run your gists in the browser',
};

export default function RootLayout({children}: PropsWithChildren) {
	return (
		<html lang="en" className='dark'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
