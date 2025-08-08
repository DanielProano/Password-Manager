import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import About from './pages/About';
import Virus from './pages/Virus';
import NotFound from './pages/NotFound';

import TopBar from './pages/TopBar';

function App() {
	return (
		<div className="layout">
			<TopBar />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/about" element={<About />} />
					<Route path="/virus" element={<Virus />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
