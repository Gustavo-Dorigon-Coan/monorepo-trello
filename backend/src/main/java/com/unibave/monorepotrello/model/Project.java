package com.unibave.monorepotrello.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "project")
@Table(name = "project")
@JsonIgnoreProperties(value = {"users"},allowSetters = true)
public class Project {

    @Id
    @Column
    @GeneratedValue(strategy =GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private Boolean inbox;

    @OneToMany(mappedBy = "project")
    @JsonIgnoreProperties(value = {"projects"},allowSetters = true)
    private List<ListOfCards> listOfCards;

    @ManyToMany
    @JoinTable(
            name = "user_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ListOfCards> getListOfCards() {
        return listOfCards;
    }

    public void setListOfCards(List<ListOfCards> listOfCards) {
        this.listOfCards = listOfCards;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Boolean getInbox() {
        return inbox;
    }

    public void setInbox(Boolean inbox) {
        this.inbox = inbox;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return id.equals(project.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
