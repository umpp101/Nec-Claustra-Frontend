// import React, { Component } from 'react'
// import Search from "./Search"
// import PeopleList  from "./PeopleList"
// import currentChatHeader from './currentChatHeader'
// import ReceivedMessages from './ReceivedMessages'
// import SentMessages from './SentMessages'
// import NewMessage from './NewMessage'

// export default class Welcome extends Component {
//     render() {
//         return (
//             <div className="container clearfix">
//             <div className="people-list" id="people-list">
//               <Search />
//               <ul className="list">
//               {this.props.myConvos.map(convo =>
//               <PeopleList
//                   getUserNameById={this.props.getUserNameById}
//                   setConvo={this.props.setConvo}
//                   allUsers={this.props.allUsers}
//                   convo={convo} key={convo.id}
//                   currentUser={this.props.currentUser} />)} 
//               </ul>
//             </div>
            
//             <div className="chat">
//             <currentChatHeader 
//             currentConvo={this.props.currentConvo}
//             />
//               {/* <!-- end chat-header --> */}
              
//               <div className="chat-history">
//                 <ul>
//                   <ReceivedMessages/>
//                   <SentMessages/>
//                 </ul>
                
//               </div> 
//               {/* <!-- end chat-history --> */}
              
//               <NewMessage/>
//               {/* <!-- end chat-message --> */}
              
//             </div> 
//             {/* <!-- end chat --> */}
            
//           </div> 

        
//         )
//     }
// }

import React, { Component } from 'react'

export class Welcome extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Welcome
