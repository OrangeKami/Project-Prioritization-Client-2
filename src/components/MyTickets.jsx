import React, { useEffect } from "react";
import { Typography, List, ListItem, Avatar, Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/StateContext";
import { getTickets } from "../services/ticketServices";
import iceScoreCalculation from "./ICE_Score";

function TicketsList({ tickets, onAddTicketClick }) {
<<<<<<< HEAD
  console.log(tickets)
  return (
    <>
      <Typography variant="h4" align="left">
        My Tickets
      </Typography>
      <List dense={true}>
        {tickets.map((ticket, index) => {
          return (
            //when we click the link, it will direct us to ticket detail page
            <ListItem>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {ticket.priority}
              </Avatar>

              <Link key={ticket._id} to={`/mytickets/${ticket._id}`}>
                <Typography>
                  Initative: {ticket.initialtive} & 
                 
                  ICE Score:
                      {iceScoreCalculation(
                          ticket.impact,
                          ticket.confidence,
                          ticket.effort
                      )}
                
                </Typography>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Button variant="outlined" onClick={onAddTicketClick}>
        Add Ticket
      </Button>
    </>
  );
}

=======
  // console.log(tickets);

  return (
    <>
      <Typography variant="h4" align="left">
        My Tickets
      </Typography>
      <List dense={true}>
        {tickets.map((ticket, index) => {
          return (
            //when we click the link, it will direct us to ticket detail page
            <ListItem key={ticket._id}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {ticket.priority}
              </Avatar>

              <Link
                to={`/mytickets/${ticket._id}`}
                state={{
                  ticket: JSON.stringify(ticket),
                }}
              >
                <Typography>
                  Initative: {ticket.initialtive} By {ticket.author.email} &
                  ICE:
                  {iceScoreCalculation(
                    ticket.impact,
                    ticket.confidence,
                    ticket.effort
                  )}
                </Typography>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Button variant="outlined" onClick={onAddTicketClick}>
        Add Ticket
      </Button>
    </>
  );
}

>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
function MyTickets() {
  let navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { tickets, loggedInUser } = store;
<<<<<<< HEAD

  // Get the list of tickets
  useEffect(() => {
    if (!loggedInUser) {
      return;
    }
    // console.log("tickets at top:", tickets) && refreshed
      getTickets()
        .then((tickets) => {
          // console.log("tickets inside:", tickets)
          dispatch({ type: "setTickets", data: tickets });
        })
        .catch((error) => console.log(error));
  }, [dispatch, loggedInUser]);

  const ticketsView =
    tickets && tickets.length > 0 ? (
      <TicketsList
        tickets={tickets}  
=======

  // Get the list of tickets
  useEffect(() => {
    // console.log("tickets at top:", tickets)
    // if (!tickets) {
    //   getTickets()
    //     .then((tickets) => {
    //       // console.log("tickets inside:", tickets)
    //       dispatch({ type: "setTickets", data: tickets });
    //     })
    //     .catch((error) => console.log(error));
    //   if (!loggedInUser) {
    //     return;
    //   }
    // ! rewrite
    const fetchMyTickets = async () => {
      const result = await getTickets();
      dispatch({ type: "setTickets", data: result });
    };
    if (loggedInUser) {
      fetchMyTickets();
    }
  }, [dispatch, loggedInUser]);

  const ticketsView =
    tickets && tickets.length > 0 ? (
      <TicketsList
        tickets={tickets}
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
        onAddTicketClick={() => navigate("/newticket")}
      />
    ) : (
      <Typography variant="h4" align="left">
        No tickets found
      </Typography>
    );

  return (
    //if users log in their account, they can see their tickets, otherwise, please sign in.
    <div>
      {loggedInUser ? ticketsView : <Typography>Please sign in.</Typography>}
    </div>
  );
}

export default MyTickets;
