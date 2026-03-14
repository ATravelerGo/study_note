package main

import (
	"fmt"
)

func main() {

	conferenceName := "Go conference"
	const conferenceTickets = 50
	var remainingTickets uint = 50

	fmt.Printf("conferenceTickets is %T, remainingTickets is %T, conferenceName is %T\n", conferenceTickets, remainingTickets, conferenceName)

	fmt.Printf("Welcome to %v booking application \n", conferenceName)
	fmt.Println("We have total of", conferenceTickets, "tickets and", remainingTickets, "are still available")
	fmt.Println("Get your tickets here to attend")

	var bookings = [50]string{"Mama", "Mile", "Chen"}

	var firstName string
	var lastName string
	var email string
	var userTickets uint
	// ask user for their user
	fmt.Println("Enter your first name:")
	fmt.Scan(&firstName)
	fmt.Println("Enter your lastName:")
	fmt.Scan(&lastName)
	fmt.Println("Enter your Email:")
	fmt.Scan(&email)
	fmt.Println("Enter number of tickets:")
	fmt.Scan(&userTickets)

	remainingTickets = remainingTickets - userTickets

	fmt.Printf("User %v %v booked %v tickets.\n", firstName, lastName, userTickets)

	fmt.Printf("%v tickets remaining for %v \n", remainingTickets, conferenceName)

}
