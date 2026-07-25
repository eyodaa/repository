package com.enterprise.dashen_repository.graph.graph_controller;

import com.enterprise.dashen_repository.graph.graph_dto.GraphResponse;
import com.enterprise.dashen_repository.graph.graph_dto.NeighborResponse;
import com.enterprise.dashen_repository.graph.graph_dto.TreeNode;
import com.enterprise.dashen_repository.graph.graph_service.GraphService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/graph")
@CrossOrigin(origins = "*")
public class GraphController {

    private final GraphService graphService;

    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping("/artifact/{id}")
    public GraphResponse getArtifactGraph(
            @PathVariable Long id) {
        return graphService.getArtifactGraph(id);
    }

    @GetMapping
    public GraphResponse getGraph() {
        return graphService.getGraph();
    }

    @GetMapping("/{id}/neighbors")
    public NeighborResponse getNeighbors(@PathVariable Long id) {
        return graphService.getNeighbors(id);
    }

    @GetMapping("/{id}/tree")
    public TreeNode getTree(@PathVariable Long id) {
        return graphService.getDependencyTree(id);
    }

}