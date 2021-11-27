package com.unibave.monorepotrello.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "card")
@Table(name = "card")
@JsonIgnoreProperties(value = {"listOfCards"},allowSetters = true)
public class Card {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "list_of_cards_id")
    private ListOfCards listOfCards;

    @OneToMany(mappedBy = "card")
    @JsonIgnoreProperties(value = {"comments"},allowSetters = true)
    private List<Comment> comments;

    @Column
    private boolean done;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ListOfCards getListOfCards() {
        return listOfCards;
    }

    public void setListOfCards(ListOfCards listOfCards) {
        this.listOfCards = listOfCards;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Card card = (Card) o;
        return id.equals(card.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}


