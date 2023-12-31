const commonHeaders = `
BASE <http://buchmann.ro#>
PREFIX schema: <http://schema.org#>
PREFIX : <http://buchmann.ro#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX reviewer: <http://buchmann.ro#/reviewer/>
PREFIX review: <http://buchmann.ro#/review/>
PREFIX store: <http://buchmann.ro#/store/>
`;

export default {
  getStoreDetailsWithAverageRating: () => `
${commonHeaders}

select ?id ?name ?address (xsd:float(sum(?rating))/xsd:float(count(?rating)) as ?averageRating) where { 
    ?id a schema:Store; 
       :hasName ?name;
       :hasAddress ?address;
       :hasReview ?review.
    ?review :hasDescription ?description;
			:hasRating ?rating.
} group by ?id ?name ?address
    `,

  getReviewsForStore: (storeId, search = "*") => `
${commonHeaders}
PREFIX luc: <http://www.ontotext.com/connectors/lucene#>
PREFIX luc-index: <http://www.ontotext.com/connectors/lucene/instance#>

SELECT ?id ?date ?description ?rating ?reviewerName where {
  ?search a luc-index:review_index ;
      luc:query "review:${search}" ;
      luc:entities ?id .
    ?id :writtenOn ?date;
       :hasDescription ?description;
       :hasRating ?rating;
       :writtenBy ?user_id;
       ^:hasReview ?store_id.
    ?user_id :hasName ?reviewerName.
    FILTER(?store_id = <${storeId}>).
}
  `,

  getReviewsForStoreFilterMine: (storeId, name) => `
${commonHeaders}

SELECT ?id ?date ?description ?rating ?reviewerName where {
	?store_id a schema:Store;
     :hasReview ?id.
    ?id :writtenOn ?date;
       	:hasDescription ?description;
       	:hasRating ?rating;
       	:writtenBy ?user_id.
    ?user_id :hasName ?reviewerName.
    FILTER NOT EXISTS {?user_id :hasName "${name}"}.
    FILTER(?store_id = <${storeId}>).
}
  `,

  getReviewCount: () => `
${commonHeaders}

select (count(?x) as ?count) where {?x a schema:Review.}
  `,

  addReview: (review) => `
${commonHeaders}

insert{
    <http://buchmann.ro#/review/${review.id}> a schema:Review; 
                                              :writtenOn "${review.date}"^^xsd:date;
                                              :hasDescription "${review.description}";
                                              :hasRating ${review.rating};
                                              :writtenBy ?x.
    ?x :wroteReview <http://buchmann.ro#/review/${review.id}>.
    <${review.storeId}> :hasReview <http://buchmann.ro#/review/${review.id}>.
}
where{
    ?x a schema:Reviewer; :hasName "${review.reviewerName}"
}
  `,
};
