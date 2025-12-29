import { Routes, Route } from 'react-router-dom';

import { Home, Login, Register, RegisterSuccess, Blog, About, Vault, Virus, Music, Notes, NotFound, TopBar, HardwareHacking } from './pages/index';

function App() {
	return (
		<div className="layout">
			<TopBar />
			<div className="content">
				<Routes>
					<Route path="/" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/about" element={<About />} />
					<Route path="/virus" element={<Virus />} />
					<Route path="/registerSuccess" element={<RegisterSuccess />} />
					<Route path="/music" element={<Music />} />
					<Route path="/vault" element={<Vault />} />
					<Route path="/notes" element={<Notes />} />
               <Route path="/HardwareHacking" element={<HardwareHacking />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
