import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BasicCard } from "./components/BasicCard.jsx";

import { CreateTable } from "./components/CreateTable.jsx";
import { CreateTableCountry } from "./components/CreateTableCountry.jsx";


function App() {

    const [isLoading , setIsloading] = useState(true);
    const [runOnce , setRunOnce] = useState(true);

	
	const selectedOptionRef = useRef(null);
	const date1Ref = useRef(null);
	const date2Ref = useRef(null);

	console.log("running again");
    const [user, setUser] = useState({
		isAuthenticated : false, 
		name:  "A Katoch", 
		// "accessToken" : "EAALtCeMI99sBO0a9QRdZCj7RSgwU806HMr1lZBIbWKZABINGuEeNZAcnGMI2ZCpQAQ11EvOYOapctkPZBZBNn9jf3bUEiv4n5asIDXwI6D9TL2NZBd5FqZAIFKYf3ZCI1ZCBiyHYqJ8ACnf0bwPVW7vJNZC3EuUYLhDoTbwprYhwrSIm0xRO3OZCMCNXZCyQW2rTO0ZAzoSLqMuDSpp534gWrtJwMRc0SQNX4T02ZCNqWnbeJzBs9QZDZD"
		"accessToken" : "asdf"
	});

	const [insight, setInsight] = useState({
	});

	const [pages, setPages] = useState({
		"pages" : [],
	});

	const getAllPages = () => {

		FB.api('/me/accounts/?fields=name,fan_count,about,access_token&access_token=' + user.accessToken, function(response){
			
			console.log("pages main ", response);
			const data = response.data;
			if (data.length == 0) {
				console.log("No pages");
				return;
			}

			setPages(prev =>{
				return {
					...prev,
					pages: [...data],
					total_pages: data.length,
				}
			})

			// setInsight(prev => {
			// 	return {
			// 		...prev,
			// 		total_likes: data.fan_count
			// 	}
			// })
		});

	}
    // 100840615985989/insights?pretty=0&since=1706342400&until=1708848000&metric=page_fans_country&period=days_28
	const getInsights = (pageID, pageAccessToken, since, until, totalPageLikes) => {
		console.log("pageID and token " , pageID , pageAccessToken, since, until);

		FB.api(`/${pageID}/insights/?metric=page_impressions_unique,page_engaged_users,page_fans_country&period=days_28&since=${since}&until=${until}&access_token=${pageAccessToken}&period=day`, function(response){
			console.log("Insights", response);

			setInsight(prev => {

				return {
					...prev,
					page_impressions : [...response.data[0].values],
					page_engaged_users : [...response.data[1].values],
					page_fans_country :  (response.data[2]?.values != undefined ? [...response.data[2].values] : []) ,
					total_page_likes : totalPageLikes
				}
			});
		});
	}



    useEffect( () => {
		
		if (!isLoading) return;
		
		FB.login(function(response) {
			if (!response.authResponse) {
				setIsloading(false);
				console.log('User cancelled login or did not fully authorize.');
				return;
			}

			const accessToken = response.authResponse.accessToken;
			console.log("accessToken", accessToken)
			FB.api('/me', function(response) {
				console.log('Good to see you, ' + response.name + '.');
				console.log("Total Response" , response, "Access token", response.authResponse);
				setUser( prev => {
					return {
					...prev,
					isAuthenticated: true,
					name: response.name,
					accessToken: accessToken
					}
				})
				// setIsloading(false);
				setIsloading(false);
			});
		
		}, {scope: "read_insights,pages_show_list,pages_read_engagement"});
	
    }, [])

	if (user.isAuthenticated && runOnce){
		setRunOnce(false);
		getAllPages();
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			selectedOption: selectedOptionRef.current.value,
			since: date1Ref.current.value,
			until: date2Ref.current.value,
		};
		
		const d = formData.selectedOption.split("@@");
		let totalPageLikes;
		
		for(let i = 0; i < pages.pages.length; i++){
			if (pages.pages[i].id == d[1]){
				totalPageLikes = pages.pages[i].fan_count
				break;
			}
		}

		
		getInsights(d[1], d[0], formData.since, formData.until, totalPageLikes);
		// Your custom logic here, for example, logging the form data
		console.log('Form Data:', formData);
		// Add more logic or API calls as needed
	};

  return (
    <>


<div className="p-4">
	
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
	<div className="grid grid-cols-1 gap-4 mb-4">
		<div className="flex flex-col gap-2 items-center justify-center">
			<div className="text-center text-red-800"> <b>Note: enable pop ups, FB Login popup opens on page load</b><br/></div>
			<div className="text-center"> <b>Things that can be done to make this webpage better</b><br/>- Using Charts instead of Tables to display data<br/> - Using icons and better color theme <br/> - Using map for geographic data</div>
			<form onSubmit={handleSubmit}>
					<select id="selectedOption" ref={selectedOptionRef} required className="p-2 w-full  border-gray-500 ">
						<option defaultValue="Select an options" default disabled>Select a page</option>
						{
							pages.pages.map(item => {
								return (<option key={item.access_token} value={item.access_token + "@@" + item.id}>
									{item.name}
								</option>)
							})
						}
					
					</select>
				<div className="p-1 w-full">
					<label className="mr-2" htmlFor="date1"><b>Since:</b></label>
					<input className="border p-1  border-gray-500 " type="date" id="date1" ref={date1Ref} required />
				</div>
				<div className="p-1 w-full">
					<label className="mr-2" htmlFor="date2"><b>Until:</b></label>
					<input className="border p-1  border-gray-500 " type="date" id="date2" ref={date2Ref} required />
				</div>
				<button type="submit" className="bg-blue-900 p-2 text-white rounded w-full">Submit</button>
				
			</form>
		</div>
			
	</div>

	<div className="grid grid-cols-3 gap-4 mb-4">

		
		<BasicCard title="Logged in user" content={user.name} />
		<BasicCard title="Total Pages" content={pages.total_pages}/>   
        
		<BasicCard title="Total Page Likes" content={insight.total_page_likes}/>   
		
	</div>

	
	<div className="grid grid-cols-2 gap-4 mb-4">
		<CreateTable title="Page Impressions" content={insight.page_impressions}/>
		<CreateTable title="Page Engagement" content={insight.page_engaged_users}/>
	</div>
     
	<div className="grid grid-cols-1 gap-4 mb-4"> 
		<CreateTableCountry title="page Fans Country" content={insight.page_fans_country}/>
	</div>

   </div>
</div>


    </>
  )
}

export default App
