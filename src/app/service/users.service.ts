import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Iuser, IuserResp } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersArr: Iuser[] = [
    {
      userName: "Jhon Doe",
      userId: "USR10245",
      userRole: "admin",
      profileDescription: "Experienced Frontend Developer with expertise in Angular, TypeScript, JavaScript, HTML, CSS, and Bootstrap. Passionate about building responsive and user-friendly web applications.",
      profileImage: "https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-man-avatar-on-isolate-png-image_13805756.png",
      skills: [
        "Angular",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "RxJS",
        "Git",
        "REST API"
      ],
      experienceYears: '4 to 6 years',
      isActive: true,
      address: {
        current: {
          city: "Pune",
          state: "Maharashtra",
          country: "India",
          zipcode: "411001"
        },
        permanent: {
          city: "Pune",
          state: "Maharashtra",
          country: "India",
          zipcode: "411001"
        }
      },
      isAddressSame: true
    },
    {
      userName: "Sophia Brown",
      userId: "USR10992",
      userRole: "candidate",
      profileDescription:
        "Frontend Developer with expertise in React, Angular, TypeScript, and modern UI frameworks. Enjoys building responsive, accessible, and high-performance web applications.",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ZSO2tXGKf88S7fxc9js8XAyMMpei6v518w&s",
      skills: [
        "Angular",
        "React",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "Git"
      ],
      experienceYears: "1 to 3 years",
      isActive: false,
      address: {
        current: {
          city: "Hyderabad",
          state: "Telangana",
          country: "India",
          zipcode: "500001"
        },
        permanent: {
          city: "Hyderabad",
          state: "Telangana",
          country: "India",
          zipcode: "500001"
        }
      },
      isAddressSame: true
    },
    {
      userName: "Emily Watson",
      userId: "USR10876",
      userRole: "manager",
      profileDescription:
        "Experienced Project Manager with strong leadership skills and expertise in Agile methodologies. Passionate about delivering high-quality software projects on time and within budget.",
      profileImage:
        "https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-businessman-flat-portrait-of-man-png-image_14641966.png",
      skills: [
        "Project Management",
        "Agile",
        "Scrum",
        "JIRA",
        "Communication",
        "Leadership",
        "Risk Management",
        "Team Management",
        "Stakeholder Management"
      ],
      experienceYears: "7 to 9 years",
      isActive: true,
      address: {
        current: {
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          zipcode: "560001"
        },
        permanent: {
          city: "Mysuru",
          state: "Karnataka",
          country: "India",
          zipcode: "570001"
        }
      },
      isAddressSame: false
    }
  ]

  setFirstUserSub$: Subject<boolean> = new Subject<boolean>()

  constructor() { }

  fetchUsersArr(): Observable<Iuser[]> {
    return of(this.usersArr);
  }

  fetchUserById(id: string): Observable<Iuser> {
    let getUserObj = this.usersArr.find(u => u.userId === id)!
    return of(getUserObj);
  }

  addUser(user: Iuser): Observable<IuserResp<Iuser>> {
    this.usersArr.unshift(user);
    return of({
      msg: `The new user with id ${user.userId} is added successfully!!!`,
      data: user
    })
  }

  updateUser(user: Iuser): Observable<IuserResp<Iuser>> {
    let getIndex = this.usersArr.findIndex(u => u.userId === user.userId);
    this.usersArr[getIndex] = user;
    return of({
      msg: `The user with id ${user.userId} is updated successfully!!!`,
      data: user
    })
  }

  removeUser(id: string): Observable<IuserResp<Iuser>> {
    let getIndex = this.usersArr.findIndex(u => u.userId === id);
    let removedUser = this.usersArr.splice(getIndex, 1);
    return of({
      msg: `The user ${removedUser[0].userName} with id ${id} is removed successfully!!!`,
      data: removedUser[0]
    })
  }
}