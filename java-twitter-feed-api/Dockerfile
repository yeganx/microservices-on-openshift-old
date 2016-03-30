FROM jboss/wildfly
ADD ./target/simple-service-webapp.war /opt/jboss/wildfly/standalone/deployments/
RUN /opt/jboss/wildfly/bin/add-user.sh admin Admin#70365 --silent
EXPOSE 9990
