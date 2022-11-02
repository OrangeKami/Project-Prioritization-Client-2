import { React, useEffect, useReducer } from "react";
import MyTickets from './MyTickets';
import NewTicket from './NewTicket';
import TicketDetails from './TicketDetails';
import Listings from './Listings';
import SearchResults from './SearchResults';
import SubmissionSuccess from './SubmissionSuccess';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Container from '@mui/material/Container';
import NavBar from './NavBar';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import { StateContext } from "../utils/StateContext"
import reducer from "../utils/StateReducer";
import { getTickets } from "../services/ticketServices";
import { getTargets } from "../services/targetServices";
import { getImpacts } from "../services/impactServices";
import { getConfidences } from "../services/confidenceServices";
import { getEfforts } from "../services/effortServices";

const sections = [
  {
    title: "My Tickets", url:"/mytickets"
  },
  {
    title: "New Ticket", url:"/newticket"
  },
  {
    title: "Listings", url:"/listings"
  }
]

function App() {
  const initialState = {
    targets: [],
    impacts: [],
    confidences: [],
    efforts: [],
    tickets: null,
    loggedInUser: null,
    auth: null,
  };
  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  useEffect(() => {
    if (!loggedInUser){
      return;
    }

    getTickets()
      .then((tickets) =>
        dispatch({ type: "setTickets", data: tickets })
      )
      .catch((error) => console.log(error));

      getTargets()
      .then((targets) =>
        dispatch({ type: "setTargets", data: targets })
      )
      .catch((error) => console.log(error));

      getImpacts()
      .then((impacts) =>
        dispatch({ type: "setImpacts", data: impacts })
      )
      .catch((error) => console.log(error));

      getConfidences()
      .then((confidences) =>
        dispatch({ type: "setConfidences", data: confidences })
      )
      .catch((error) => console.log(error));

      getEfforts()
      .then((efforts) =>
        dispatch({ type: "setEfforts", data: efforts })
      )
      .catch((error) => console.log(error));


  }, [loggedInUser]);


  return (
    <StateContext.Provider value={{ store, dispatch }}>
    <div className="App">
        <Header />
        <Container maxWidth='lg'>
            <NavBar title="Project Priorization" sections={sections}></NavBar>
        </Container>

        <Routes>
          <Route path="/" element={<MyTickets />} />
          <Route path="mytickets" element={<MyTickets />} />
          <Route path="newticket" element={<NewTicket />} />
          <Route path="myticket/update/:id" element={<NewTicket />} />
          <Route path="listings" element={<Listings />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="searchresults" element={<SearchResults />} />
          <Route path="submissionsuccess" element={<SubmissionSuccess />} />
          <Route path="mytickets/:id" element={<TicketDetails  />} />
         
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      
    </div>
    </StateContext.Provider>
  );
}

export default App;