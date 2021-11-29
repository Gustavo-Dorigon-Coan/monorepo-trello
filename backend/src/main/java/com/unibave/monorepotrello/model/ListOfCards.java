package com.unibave.monorepotrello.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.sun.istack.NotNull;
import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "list_of_cards")
@Table(name = "list_of_cards")
@JsonIgnoreProperties(value = {"project"},allowSetters = true)
public class ListOfCards {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "listOfCards")
    @JsonIgnoreProperties(value = {"listOfCards"},allowSetters = true)
    private List<Card> cards;

    @Column
    private String color;

    @Column(name = "order_sequence")
    private Integer order;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListOfCards listOfCards = (ListOfCards) o;
        return id.equals(listOfCards.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
