import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProducerProvider } from './context/producer.context.tsx'
import MainMenu from './components/mainMenu.tsx'
import EventDetailsForUser from './components/eventDetailsForUser.tsx'
import { AddProducer } from './components/addProducer.tsx'
import ProducerDetails from './components/producerDetails.tsx'
import { EventProvider } from './context/event.context.tsx'
import ProducerMenu from './components/producerMenu.tsx'
import ProducerEventDetails from './components/producerEventDetails.tsx'
import EventListForUserWithSearch from './components/eventListForUserWithSearch.tsx'
import { AddEvent } from './components/addEvent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <ProducerProvider>
          <MainMenu />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/user" element={<EventListForUserWithSearch />} />
            <Route path="/user/:id" element={<EventDetailsForUser />} />
            <Route path="/producers" element={<ProducerMenu/>} />
            <Route path="/producers/sign-up" element={<AddProducer />} />
            <Route path="/producers/sign-in/:email" element={<ProducerDetails />} />
          {/* //  <Route path="/producers/sign-in/:email" element={<AddEvent />} /> */}
            <Route path="/events/:id" element={<ProducerEventDetails />} />
          </Routes>
          </ProducerProvider>
      </EventProvider>
  </BrowserRouter>
  </StrictMode >,
)
